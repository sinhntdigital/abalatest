import { Pipe, PipeTransform } from '@angular/core';
import { UserViewModel } from '../../models/auth';

/**
 * Generated class for the UserEmployeeFemalePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userEmployeeFemale',
})
export class UserEmployeeFemalePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(allHeroes: UserViewModel[]) {
    return allHeroes.filter(hero => (hero.Sex == false));
  }

}
