export interface Invitation {
    Id: number;
    Status: InvitationStatus;
    UserId: number;
}

type InvitationStatus = 'Coming' | 'Tentative' | 'Declined';