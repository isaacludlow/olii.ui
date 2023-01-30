import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addUsernameToUsernameCollectionWhenNewUserIsCreated = functions
    .firestore.document("users/{userId}").onCreate((snapshot, context) => {
      return admin
          .firestore()
          .collection("usernames")
          // Creates a new document since no doc with this id will exist.
          .doc(context.params.userId)
          .set({username: snapshot.get("username")});
    });
