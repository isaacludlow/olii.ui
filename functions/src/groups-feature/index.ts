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
      const numberOfMembers = (await admin.firestore()
          .collection(`groups/${context.params.groupId}/members`)
          .get()).size;

      if (numberOfMembersInPreview < 5 && numberOfMembers >=5) {
        const numberOfMembersToGet = 5 - numberOfMembersInPreview;
        const members = await admin.firestore()
            .collection("groups/{groupId}/members")
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
