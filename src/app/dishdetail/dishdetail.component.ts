import { Component, OnInit, ViewChild } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;  
  @ViewChild('fform') feedbackFormDirective;
  
  // this particular form validation pattern is prescribed in the angular.io website documentation
  formErrors = {
    'name': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'name': {
      'required': 'Author name is required',
      'minlength': 'First name must be at least 2 characters long'
    },
    'rating': {
      'required': 'Select a rank'
    },
    'comment': {
      'required': 'Comment text is required.',
      'pattern': 'The comment text must be at least 2 characters long'
    }
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params["id"]))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      rating: [0, [Validators.required]],
      comment: ["", [Validators.required]],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      console.log("feedback FORM: ", data)
    );
  }

  onSubmit() {
  //   this.comment = this.commentForm.value;
  //   console.log(this.feedback);
    // reset()
    // You can reset to a specific form state by passing in a map of states
    // that matches the structure of your form. The state can be a standalone value 
    // or a form state object with both a value and a disabled status.
    this.commentForm.reset({
      name: '',
      rating: 0,
      comment: ''
    });
    // this.commentFormDirective.resetForm();
  }

}
