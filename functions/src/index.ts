import * as admin from "firebase-admin";

import * as eventFunctions from "./events-feature";
import * as groupFunctions from "./groups-feature";
import * as profileFunctions from "./profile-feature";

admin.initializeApp();


// Event functions
export const addAttendingEventToMyEvents =
    eventFunctions.addAttendingEventToMyEvents;
export const removeAttendingEventToMyEvents =
    eventFunctions.removeAttendingEventToMyEvents;
export const updateEventReferencesWhenEventDateIsUpdated =
    eventFunctions.updateEventReferencesWhenEventDateIsUpdated;
export const addFirstFiveAttendeesToPreview =
    eventFunctions.addFirstFiveAttendeesToPreview;

// Group functions
export const addFirstFiveMembersToPreview =
    groupFunctions.addFirstFiveMembersToPreview;
export const addToMyGroupsWhenAddedAsGroupMember =
    groupFunctions.addToMyGroupsWhenAddedAsGroupMember;
export const removeFromMyGroupsWhenRemovedAsGroupMember =
    groupFunctions.removeFromMyGroupsWhenRemovedAsGroupMember;
export const sumAllMembersWhenUpdated =
    groupFunctions.sumAllMembersWhenUpdated;

// Profile functions
export const addFirstFiveSavedImagesAlbumsToPreview =
    profileFunctions.addFirstFiveSavedImagesAlbumsToPreview;
export const updateProfilePreviewAcrossDatabase =
    profileFunctions.updateProfilePreviewAcrossDatabase;
