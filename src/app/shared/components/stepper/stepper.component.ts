import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  providers: [{
    provide: CdkStepper, useExisting: StepperComponent
  }]
})
export class StepperComponent extends CdkStepper {

  @Input() linearModeSelected: boolean;

  ngOnInit(){
    this.linear = this.linearModeSelected;
  }

  onClick(index: number) {
    this.selectedIndex = index;
  }

}
