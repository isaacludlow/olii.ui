import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addAttendingEventToMyEvents = functions.firestore
    .document("events/{eventId}/attendees/{attendeeDocId}")
    .onCreate(async (snapshot, context) => {
      const event = await admin.firestore()
          .doc(`events/${context.params.eventId}`)
          .get();
      const eventPreview = {
        eventId: context.params.eventId,
        date: event.get("date"),
      };

      admin.firestore()
          .collection(`profiles/${context.auth?.uid}/myEvents`)
          .doc(context.eventId) // Creates a new document since it won't exist.
          .set(eventPreview);
    });

export const removeAttendingEventToMyEvents = functions.firestore
    .document("events/{eventId}/attendees/{attendeeDocId}")
    .onDelete(async (snapshot, context) => {
      return admin.firestore()
          .doc(
              `profiles/${context.auth?.uid}/myEvents/${context.params.eventId}`
          )
          .delete();
    });


export const updateEventReferencesWhenEventDateIsUpdated = functions.firestore
    .document("events/{eventId}")
    .onUpdate(async (change, context) => {
      const updatedEventData = change.after.data();
      const attendeesDocs = await admin.firestore()
          .collection(`events/${context.params.eventId}/attendees`)
          .get();

      attendeesDocs.forEach((doc) => {
        const attendeeProfileId = doc.data().profileId;
        admin.firestore()
            .doc(
                `profiles/${attendeeProfileId}
                /myEvents/${context.params.eventId}`
            )
            .update("date", updatedEventData.date);
      });

      admin.firestore()
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
      const numberOfAttendees = (await admin.firestore()
          .collection(`events/${context.params.eventId}/attendees`)
          .get()).size;

      if (numberOfAttendeesInPreview < 5 && numberOfAttendees >= 5) {
        const numberOfAttendeesToGet = 5 - numberOfAttendeesInPreview;
        const attendees = await admin.firestore()
            .collection("events/{eventId}/attendees")
            .limit(numberOfAttendeesToGet).get();

        attendees.forEach((doc) => {
          const docData = doc.data();
          event.ref
              .update(
                  "attendeesPreview",
                  admin.firestore.FieldValue.arrayUnion(docData)
              );
        });
      }
    });
