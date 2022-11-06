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
            .collection("groups/{groupId}/members")
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
