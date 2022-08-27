import { addDays } from "date-fns";
import { Event } from "src/app/models/dto/community/events/event.dto";
import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";
import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.do";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export let mockEventData_allEvents: Event[];
export let mockEventData_myEvents: Event[];
export let mockEventData_eventById: Event;
export let mockEventData_newEvent: Event;
let eventImageUrls = [
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    'https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    'https://images.unsplash.com/photo-1569930784237-ea65a2f40a83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
];

mockEventData_allEvents = [
    {
        EventId: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        Creator: {
            Id: 217,
            IdType: EventCreatorIdType.Profile,
            DisplayName: 'John Doe',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
        EventId: 2,
        CoverImageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
        Title: 'National chair convention',
        Description: 'The worlds largest event for chairs and the threat they pose to our butts.',
        Creator: {
            Id: 398,
            IdType: EventCreatorIdType.Group,
            DisplayName: 'Berlin Football Crew',
            ImageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c29jY2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Fake location from Google',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
    },
    {
        EventId: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        Creator: {
            Id: 217,
            IdType: EventCreatorIdType.Profile,
            DisplayName: 'John Doe',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
        EventId: 2,
        CoverImageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
        Title: 'National chair convention',
        Description: 'The worlds largest event for chairs and the threat they pose to our butts.',
        Creator: {
            Id: 398,
            IdType: EventCreatorIdType.Group,
            DisplayName: 'Berlin Football Crew',
            ImageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c29jY2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Fake location from Google',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
    },
    {
        EventId: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        Creator: {
            Id: 217,
            IdType: EventCreatorIdType.Profile,
            DisplayName: 'John Doe',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: []
    }
];

mockEventData_myEvents = [
    {
        EventId: 2,
        CoverImageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
        Title: 'National chair convention',
        Description: 'The worlds largest event for chairs and the threat they pose to our butts.',
        Creator: {
            Id: 98,
            IdType: EventCreatorIdType.Profile,
            DisplayName: 'John Doe',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(2022, 11, 1),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
        EventId: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        Creator: {
            Id: 217,
            IdType: EventCreatorIdType.Group,
            DisplayName: 'Olii App',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(2022, 11, 1),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
            <PartialProfile>{
                ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
            },
        ]
    },
    {
        EventId: 1,
        CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
        Title: 'Olii app beta release party',
        Description: 'Come celebrate the beta release of the Olii app with us!',
        Creator: {
            Id: 217,
            IdType: EventCreatorIdType.Profile,
            DisplayName: 'John Doe',
            ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
        },
        Date: new Date(2021, 11, 1),
        PrivacyLevel: PrivacyLevel.Public,
        Location: {
            DisplayName: 'Eagle Creek Park',
            Latitude: 36.121159802475646,
            Longitude: -115.17502713288535
        },
        ImageUrls: eventImageUrls,
        AttendeeProfiles: [
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
    }
];

mockEventData_eventById = {
    EventId: 1,
    CoverImageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
    Title: 'Olii app beta release party',
    Description: 'Come celebrate the beta release of the Olii app with us!',
    Creator: {
        Id: 217,
        IdType: EventCreatorIdType.Profile,
        DisplayName: 'John Doe',
        ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    Date: new Date(),
    PrivacyLevel: PrivacyLevel.Public,
    Location: {
        DisplayName: 'Eagle Creek Park',
        Latitude: 36.121159802475646,
        Longitude: -115.17502713288535
    },
    ImageUrls: eventImageUrls,
    AttendeeProfiles: [
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        },
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        }
    ]
};

mockEventData_newEvent = {
    EventId: 3,
    CoverImageUrl: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFza2V0YmFsbCUyMGdhbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60',
    Title: 'Utah Jazz squad',
    Description: 'Just a bunch of guys who love basketball',
    Creator: {
        Id: 98,
        IdType: EventCreatorIdType.Profile,
        DisplayName: 'John Doe',
        ImageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    Date: addDays(new Date(), 3),
    PrivacyLevel: PrivacyLevel.Public,
    Location: {
        DisplayName: 'Vivint Arena',
        Latitude: 40.768749,
        Longitude: -111.900429
    },
    ImageUrls: eventImageUrls,
    AttendeeProfiles: [
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        },
        <PartialProfile>{
            ProfilePictureUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
        }
    ]
};
