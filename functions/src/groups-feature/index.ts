import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addFirstFiveMembersToPreview = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onWrite(async (change, context) => {
      const group = await admin.firestore()
          .doc(`groups/${context.params.groupId}`)
          .get();

      if (!change.after.exists) {
        await group.ref.update(
            "membersPreview",
            admin.firestore.FieldValue.arrayRemove(change.before.data())
        );
      }

      const numberOfMembersInPreview = group
          .get("membersPreview").length;
      const numberOfMembersToGet = 5 - numberOfMembersInPreview;

      if (numberOfMembersInPreview < 5) {
        const members = await admin.firestore()
            .collection(`groups/${context.params.groupId}/members`)
            .offset(numberOfMembersInPreview)
            .limit(numberOfMembersToGet).get();

        for (const memberDoc of members.docs) {
          const docData = memberDoc.data();
          await group.ref
              .update(
                  "membersPreview",
                  admin.firestore.FieldValue.arrayUnion(docData)
              );
        }

        return "Updated";
      } else return null;
    });

export const addToMyGroupsWhenAddedAsGroupMember = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onCreate(async (snapshot, context) => {
      const profileId = snapshot.data().profileId;
      const myGroupData = {
        groupId: context.params.groupId,
        isAdmin: false,
      };

      return admin.firestore()
          .collection(`profiles/${profileId}/myGroups`)
          // Creates a new document since no doc with this id will exist.
          .doc(context.params.groupId)
          .set(myGroupData);
    });

export const removeFromMyGroupsWhenRemovedAsGroupMember = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onDelete(async (snapshot, context) => {
      const profileId = snapshot.data().profileId;

      return admin.firestore()
          .doc(
              `profiles/${profileId}/myGroups/${context.params.groupId}`
          )
          .delete();
    });

export const addToMyGroupsWhenNewGroupIsCreated = functions.firestore
    .document("groups/{groupId}")
    .onCreate(async (snapshot, context) => {
      const profileId: any = snapshot.data().admins[0].profileId;
      const myGroupData = {
        groupId: context.params.groupId,
        isAdmin: true,
      };

      return admin.firestore()
          .collection(`profiles/${profileId}/myGroups`)
          // Creates a new document since no doc with this id will exist.
          .doc(context.params.groupId)
          .set(myGroupData);
    });

export const removeFromMyGroupsWhenRemovedAsGroupAdmin = functions.firestore
    .document("groups/{groupId}")
    .onUpdate((change, context) => {
      const adminsBeforeUpdate = change.before.data().admins as Array<any>;
      const adminsAfterUpdate = change.after.data().admins as Array<any>;

      if (adminsBeforeUpdate.length > adminsAfterUpdate.length) {
        let profileId;

        for (let i = 0; i < adminsBeforeUpdate.length; i++) {
          if (!adminsAfterUpdate.includes(adminsBeforeUpdate[i])) {
            profileId = adminsBeforeUpdate[i].profileId;
          }
        }

        return admin.firestore()
            .doc(
                `profiles/${profileId}
                /myGroups/${context.params.groupId}`
            )
            .delete();
      } else return null;
    });

export const sumAllMembersWhenUpdated = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onWrite(async (snapshot, change) => {
      const memberDocRefs = await admin.firestore()
          .collection(`groups/${change.params.groupId}/members`)
          .listDocuments();

      const numberOfMembers = memberDocRefs.length;
      return admin.firestore().doc(`groups/${change.params.groupId}`)
          .update("totalMembers", numberOfMembers);
    });

export const updateGroupReferencesWhenGroupIsUpdated = functions.firestore
    .document("groups/{groupId}")
    .onUpdate(async (change, context) => {
      const oldGroup = change.before.data();
      const newGroup = change.after.data();

      const hasNameOrCoverImageChanged =
        oldGroup.name !== newGroup.name ||
        oldGroup.coverImageUrl !== newGroup.coverImageUrl;

      if (hasNameOrCoverImageChanged) {
        return;
      }
      
      
      // Update group posts
      const newGroupPreview = {
        groupId: context.params.groupId,
        name: newGroup.name,
        coverImageUrl: newGroup.coverImageUrl,
      };

      const groupPosts = await admin.firestore()
        .collection("group_posts/{group_postId}")
        .where("groupPreview.groupId", "==", context.params.groupId)
        .get();

        groupPosts?.forEach(doc =>
          doc?.ref.update("groupPreview", newGroupPreview));

        // Update group events
        const groupEventCreator = {
          creatorId: context.params.groupId,
          creatorType: "group",
          displayName: newGroup.name,

        };

        const groupEvents = await admin.firestore()
        .collection("events/{eventId}")
        .where("creator.creatorId", "==", context.params.groupId)
        .get();

        groupEvents?.forEach(doc =>
          doc?.ref.update("creator", groupEventCreator));
    });

// ========== Group Posts ==========
export const deleteImagesWhenGroupPostIsDeleted = functions.firestore
    .document("group_posts/{groupPostId}").onDelete((snapshot, context) => {
      return admin
          .storage()
          .bucket()
          .deleteFiles({prefix: `group_posts/${context.params.groupPostId}/`});
    });
