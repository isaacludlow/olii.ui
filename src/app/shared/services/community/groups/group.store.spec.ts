import { TestBed } from '@angular/core/testing';
import { GroupStore } from './group.store';

describe('GroupService', () => {
    let service: GroupStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GroupStore);
    });
});