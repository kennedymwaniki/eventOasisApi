import { Injectable } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';

import { Action } from './action.enum';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/roleEnums';

type subject = 'all' | 'User' | 'Event' | 'Ticket';

// define type of ability we are to use
export type AppAbility = PureAbility<[Action, subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.role === UserRole.ADMIN) {
      can(Action.Manage, 'all');
    } else if (user.role === UserRole.ORGANIZER) {
      can(Action.Manage, 'Event');
      can(Action.Create, 'Ticket');
      can(Action.Read, 'Ticket');
      can(Action.Read, 'User');
      can(Action.Read, 'Event');
    } else if (user.role === UserRole.USER) {
      can(Action.Read, 'Event');
      can(Action.Read, 'Ticket');
      can(Action.Read, 'User');
      can(Action.Create, 'Ticket');
    } else {
      // Default permissions for other roles or unauthenticated users
      can(Action.Read, 'Event');
    }

    return build();
  }
}
