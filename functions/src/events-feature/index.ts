import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addAttendingEventToMyEvents = functions.firestore
    .document("events/{eventId}/attendees/{attendeeId}")
    .onCreate(async (snapshot, context) => {
      const profileId = snapshot.data().profileId;
      const event = await admin.firestore()
          .doc(`events/${context.params.eventId}`)
          .get();
      const eventPreview = {
        eventId: context.params.eventId,
        date: event.get("date"),
      };

      return admin.firestore()
          .collection(`profiles/${profileId}/myEvents`)
          // Creates a new document since no doc with will exist.
          .doc(context.params.eventId)
          .set(eventPreview);
    });

export const removeAttendingEventToMyEvents = functions.firestore
    .document("events/{eventId}/attendees/{attendeeId}")
    .onDelete(async (snapshot, context) => {
      const profileId = snapshot.data().profileId;

      return admin.firestore()
          .doc(
              `profiles/${profileId}/myEvents/${context.params.eventId}`
          )
          .delete();
    });


export const updateEventReferencesWhenEventDateIsUpdated = functions.firestore
    .document("events/{eventId}")
    .onUpdate(async (change, context) => {
      if (change.before.get("date") === change.after.get("date")) {
        return;
      }

      const updatedEventData = change.after.data();
      const attendeesDocs = await admin.firestore()
          .collection(`events/${context.params.eventId}/attendees`)
          .get();

      for (const attendeesDoc of attendeesDocs.docs) {
        const attendeeProfileId = attendeesDoc.data().profileId;
        await admin.firestore()
            .doc(
                `profiles/${attendeeProfileId}
                /myEvents/${context.params.eventId}`
            )
            .update("date", updatedEventData.date);
      }

      return admin.firestore()
          .collection(
              "groups/{groupId}/events/{eventId}"
          )
          .doc()
          .update("date", updatedEventData.date);
    });

export const addFirstFiveAttendeesToPreview = functions.firestore
    .document("events/{eventId}/attendees/{attendeeId}")
    .onWrite(async (change, context) => {
      const event = await admin.firestore()
          .doc(`events/${context.params.eventId}`)
          .get();

      if (!change.after.exists) {
        await event.ref.update(
            "attendeesPreview",
            admin.firestore.FieldValue.arrayRemove(change.before.data())
        );
      }

      const numberOfAttendeesInPreview = event
          .get("attendeesPreview").length;
      const numberOfAttendeesToGet = 5 - numberOfAttendeesInPreview;

      if (numberOfAttendeesInPreview < 5) {
        const attendees = await admin.firestore()
            .collection("events/{eventId}/attendees")
            .offset(numberOfAttendeesInPreview)
            .limit(numberOfAttendeesToGet).get();

        for (const attendeeDoc of attendees.docs) {
          const docData = attendeeDoc.data();
          await event.ref
              .update(
                  "attendeesPreview",
                  admin.firestore.FieldValue.arrayUnion(docData)
              );
        }

        return "Updated";
      } else return null;
    });
