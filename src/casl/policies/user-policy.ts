import { Injectable } from '@nestjs/common';
import { Action } from '../action.enum';
import { AppAbility } from '../casl-ability.factory';

@Injectable()
export class UserPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'User');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'User');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'User');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'User');
  }

  static manage(ability: AppAbility) {
    return ability.can(Action.Manage, 'User');
  }
}
