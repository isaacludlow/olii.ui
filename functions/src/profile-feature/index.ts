import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";

export const addFirstFiveSavedImagesAlbumsToPreview = functions.firestore
    .document("profiles/{profileId}/savedImagesAlbums/{albumId}")
    .onWrite(async (change, context) => {
      const profile = await admin.firestore()
          .doc(`profiles/${context.params.profileId}`)
          .get();

      if (!change.after.exists) {
        await profile.ref.update(
            "savedImagesAlbumsPreview",
            admin.firestore.FieldValue.arrayRemove(change.before.data())
        );
      }

      const numberOfSavedImagesAlbumsInPreview = profile
          .get("savedImagesAlbumsPreview").length;
      const numberOfSavedImagesAlbumsToGet =
          5 - numberOfSavedImagesAlbumsInPreview;

      if (numberOfSavedImagesAlbumsInPreview < 5) {
        const savedImagesAlbums = await admin.firestore()
            .collection("profiles/{profileId}/savedImagesAlbums")
            .offset(numberOfSavedImagesAlbumsInPreview)
            .limit(numberOfSavedImagesAlbumsToGet).get();

        savedImagesAlbums.forEach((doc) => {
          const docData = doc.data();
          profile.ref
              .update(
                  "savedImagesAlbumsPreview",
                  admin.firestore.FieldValue.arrayUnion(docData)
              );
        });
      }
    });

export const updateProfilePreviewAcrossDatabase = functions.firestore
    .document("profiles/{profileId}")
    .onUpdate(async (change, context) => {
      const oldProfile = change.before.data();
      const newProfile = change.after.data();

      const hasNameFieldsOrProfilePictureChanged =
        oldProfile.firstName !== newProfile.firstName ||
        oldProfile.lastName !== newProfile.lastName ||
        oldProfile.profilePictureUrl !== newProfile.profilePictureUrl;

      if (hasNameFieldsOrProfilePictureChanged) {
        return;
      }

      const oldProfilePreview = {
        firstName: oldProfile.firstName,
        lastName: oldProfile.lastName,
        profileId: context.params.profileId,
        profilePictureUrl: oldProfile.profilePictureUrl,
      };
      const newProfilePreview = {
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        profileId: context.params.profileId,
        profilePictureUrl: newProfile.profilePictureUrl,
      };

      // Update group admin, if needed
      const groupAdmins = await admin.firestore()
          .collection("groups/{groupId}")
          .where("admins", "array-contains", oldProfilePreview)
          .get();

      groupAdmins.docs[0]?.ref
          .update(
              "admins",
              firestore.FieldValue.arrayRemove(oldProfilePreview)
          );
      groupAdmins.docs[0]?.ref
          .update(
              "admins",
              firestore.FieldValue.arrayUnion(newProfilePreview)
          );

      // Update group membersPreview, if needed
      const groupMembersPreview = await admin.firestore()
          .collection("groups/{groupId}")
          .where("membersPreview", "array-contains", oldProfilePreview)
          .get();

      groupMembersPreview.docs[0]?.ref
          .update(
              "membersPreview",
              firestore.FieldValue.arrayRemove(oldProfilePreview)
          );
      groupMembersPreview.docs[0]?.ref
          .update(
              "membersPreview",
              firestore.FieldValue.arrayUnion(newProfilePreview)
          );

    // TODO: Test to see if these updates work. I think the [0] is only going to update one document instead of
    // all the documents matching the query. They should most likely be looped over and each updated.
      // Update group members sub-collection, if needed
      const groupMembers = await admin.firestore()
          .collection("groups/{groupId}/members/{memberId}")
          .where("profileId", "==", context.params.profileId)
          .get();

      groupMembers.docs[0]?.ref.update(newProfilePreview);

      // Update group_posts author, if needed
      const groupPostsAuthor = await admin.firestore()
          .collection("group_posts/{group_postId}")
          .where("author.profileId", "==", context.params.profileId)
          .get();

      groupPostsAuthor.docs[0]?.ref.update("author", newProfilePreview);

      // Update group_posts comments author, if needed
      const groupPostsCommentAuthor = await admin.firestore()
          .collection("group_posts/{group_postId}/comments/{commentId}")
          .where("author.profileId", "==", context.params.profileId)
          .get();

      groupPostsCommentAuthor.docs[0]?.ref
          .update("author", newProfilePreview);


      // Update eventCreator, if needed
      const eventCreator = await admin.firestore()
          .collection("events/{eventId}")
          .where("creator.profileId", "==", context.params.profileId)
          .get();

      const newEventCreator = {
        creatorId: newProfilePreview.profileId,
        creatorType: "profile",
        displayName:
            newProfilePreview.firstName + " " + newProfilePreview.lastName,
        imageUrl: newProfilePreview.profilePictureUrl,
      };
      eventCreator.docs[0]?.ref.update("creator", newEventCreator);

      // Update attendeesPreview, if needed
      const eventAttendeesPreview = await admin.firestore()
          .collection("events/{eventId}")
          .where("attendeesPreview", "array-contains", oldProfilePreview)
          .get();

      eventAttendeesPreview.docs[0]?.ref
          .update(
              "membersPreview",
              firestore.FieldValue.arrayRemove(oldProfilePreview)
          );
      eventAttendeesPreview.docs[0]?.ref
          .update(
              "membersPreview",
              firestore.FieldValue.arrayUnion(newProfilePreview)
          );

      // Update attendees sub-collection, if needed
      const eventAttendees = await admin.firestore()
          .collection("events/{eventId}/attendees/{attendeeId}")
          .where("profileId", "==", context.params.profileId)
          .get();

      eventAttendees.docs[0]?.ref.update(newProfilePreview);
    });
