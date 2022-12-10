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

        members.forEach((doc) => {
          const docData = doc.data();
          group.ref
              .update(
                  "membersPreview",
                  admin.firestore.FieldValue.arrayUnion(docData)
              );
        });
      }
    });

export const addToMyGroupsWhenAddedAsGroupMember = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onCreate(async (snapshot, context) => {
      const myGroupData = {
        groupId: context.params.groupId,
        isAdmin: false
      };

      admin.firestore()
          .collection(`profiles/${context.auth?.uid}/myGroups`)
          .doc(context.params.memberId) // Creates a new document since it won't exist.
          .set(myGroupData);
    });

export const removeFromMyGroupsWhenRemovedAsGroupMember = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onDelete(async (snapshot, context) => {
      admin.firestore()
          .doc(
              `profiles/${context.auth?.uid}/myGroups/${context.params.memberId}`
          )
          .delete();
    });

export const addToMyGroupsWhenNewGroupIsCreated = functions.firestore
    .document("groups/{groupId}")
    .onCreate(async (snapshot, context) => {
      const myGroupData = {
        groupId: context.params.groupId,
        isAdmin: true
      };

      admin.firestore()
          .collection(`profiles/${context.auth?.uid}/myGroups`)
          .doc(context.params.groupId) // Creates a new document since it won't exist.
          .set(myGroupData);
    });

export const removeFromMyGroupsWhenRemovedAsGroupAdmin = functions.firestore
    .document("groups/{groupId}")
    .onUpdate((change, context) => {
      if (change.before.data().admins.length > change.after.data().admins.length) {
        admin.firestore()
            .doc(
                `profiles/${context.auth?.uid}/myGroups/${context.params.groupId}`
            )
            .delete();
      }
    });

export const sumAllMembersWhenUpdated = functions.firestore
    .document("groups/{groupId}/members/{memberId}")
    .onWrite(async (snapshot, change) => {
      const memberDocRefs = await admin.firestore()
        .collection(`groups/${change.params.groupId}/members`)
        .listDocuments();

        const numberOfMembers = memberDocRefs.length;
        admin.firestore().doc(`groups/${change.params.groupId}`)
          .update("totalMembers", numberOfMembers)
    });
