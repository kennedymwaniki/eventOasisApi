import { Injectable } from '@nestjs/common';
import { Action } from '../action.enum';
import { AppAbility } from '../casl-ability.factory';

@Injectable()
export class EventPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'Event');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'Event');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'Event');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'Event');
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, 'Event');
  }
}
