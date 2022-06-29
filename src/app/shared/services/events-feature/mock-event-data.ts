import { EventCreatorType } from "src/app/models/dto/community/events/event-creator-type.dto";
import { Event } from "src/app/models/dto/community/events/event.dto";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export let mockEventData_allEvents: Event[];
export let mockEventData_myEvents: Event[];
export let mockEventData_eventById: Event;

mockEventData_allEvents = [
    {
        Id: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        CreatorType: EventCreatorType.User,
        CreatorId: 217,
        Date: new Date(),
        PrivacyLevel: 'Public',
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: [],
        Attendees: [
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            }
        ]
    },
    {
        Id: 2,
        CoverImageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
        Title: 'National chair convention',
        Description: 'The worlds largest event for chairs and the threat they pose to our butts.',
        CreatorType: EventCreatorType.User,
        CreatorId: 378,
        Date: new Date(),
        PrivacyLevel: 'Public',
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: [],
        Attendees: [
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            }
        ]
    }
];

mockEventData_myEvents = [
    {
        Id: 2,
        CoverImageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
        Title: 'National chair convention',
        Description: 'The worlds largest event for chairs and the threat they pose to our butts.',
        CreatorType: EventCreatorType.User,
        CreatorId: 378,
        Date: new Date(),
        PrivacyLevel: 'Public',
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: [],
        Attendees: [
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
            }
        ]
    },
    {
        Id: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        CreatorType: EventCreatorType.User,
        CreatorId: 217,
        Date: new Date(),
        PrivacyLevel: 'Public',
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: [],
        Attendees: [
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
        ]
    }
];

mockEventData_eventById = {
    Id: 1,
    CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
    Title: 'Olii app beta release party',
    Description: 'Come celebrate the beta release of the Olii app with us!',
    CreatorType: EventCreatorType.User,
    CreatorId: 217,
    Date: new Date(),
    PrivacyLevel: 'Public',
    Location: {
        DisplayName: 'Eagle Creek Park',
        Latitude: 36.121159802475646,
        Longitude: -115.17502713288535
    },
    ImageUrls: [],
    Attendees: [
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        },
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        }
    ]
};
