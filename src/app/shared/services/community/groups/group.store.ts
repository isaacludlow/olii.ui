import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { GroupService } from "./group.service";
import { Group } from "src/app/models/dto/community/groups/group.dto";

@Injectable({
    providedIn: 'root'
})

export class GroupStore {
    // TODO-L28: Update groupStore to follow the patterns in the eventStore.
    private manualOverrideForGroupSection = new BehaviorSubject<Section>('feed');

    constructor(private groupService: GroupService) {}

	set groupSection(section: Section) {
		this.manualOverrideForGroupSection.next(section);
	}

	get groupSection() {
		const currentSection = this.manualOverrideForGroupSection.value;
		this.manualOverrideForGroupSection.next('feed');
		
		return currentSection;
	}

    getGroupAll() {
        return this.groupService.getGroupAll();
    }

    getGroupById(groupId: number): Observable<Group> {
        return this.groupService.getGroupById(groupId);
    }

    postNewGroup() {

    }

    // TODO-AfterBeta: Allow an admin to delete a group.
}

type Section = 'feed' | 'events';