import { TestBed } from '@angular/core/testing';
import { GroupFeatureStore } from './group-feature.store';

describe('GroupService', () => {
    let service: GroupFeatureStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GroupFeatureStore);
    });
});