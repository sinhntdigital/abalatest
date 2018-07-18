import { NgModule } from '@angular/core';
import { UserEmployeeFemalePipe } from './user-employee-female/user-employee-female';
import { UserEmployeeMalePipe } from './user-employee-male/user-employee-male';
@NgModule({
	declarations: [UserEmployeeFemalePipe,
    UserEmployeeMalePipe],
	imports: [],
	exports: [UserEmployeeFemalePipe,
    UserEmployeeMalePipe]
})
export class PipesModule {}
