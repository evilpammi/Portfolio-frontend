import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { RoleService } from "../../services/role.service";
import { NbDialogService, NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-users",
  templateUrl: "user-management.component.html",
  styleUrls: ["user-management.component.scss"]
})
export class UserManagementComponent {
  users: any;
  user: any;
  checked: boolean = true;
  modalConfig: any = {
    closeOnBackdropClick: false,
    closeOnEsc: false,
    hasBackdrop: true
  };
  dialogRef: any;

  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },
    mode: "external",
    actions: {
      add: false
    },
    columns: {
      user_fname: {
        title: "First Name",
        type: "string"
      },
      user_lname: {
        title: "Last Name",
        type: "string"
      },
      user_name: {
        title: "Username",
        type: "string"
      },
      user_email: {
        title: "E-mail",
        type: "string"
      },
      user_status: {
        title: "Status",
        type: "string",
        valuePrepareFunction: value => {
          return value === "active" ? "Active" : "Inactive";
        }
      },
      role_name: {
        title: "Role",
        type: "string"
      }
    }
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    var $this = this;
    this.userService.getAll().subscribe(function(res) {
      if (res.isPass) {
        $this.users = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  getAllRole() {
    var $this = this;
    this.roleService.getAll().subscribe(function(res) {
      if (res.isPass) {
        $this.users = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  openModal(type, e, content) {
    var $this = this;
    console.log(e.data)
    if(type == "add"){
      this.clearInput();
      this.dialogRef = this.dialogService.open(content, this.modalConfig);
    }
    else{
      this.user = e.data;
      this.checked = (this.user.user_status == 'active')? true : false;
      this.dialogRef = this.dialogService.open(content, this.modalConfig);
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  save(type){
    if(type == "add"){
      var $this = this;
      console.log(this.user);
      this.userService.createUser(this.user.user_name, this.user.user_password
          , this.user.user_fname, this.user.user_lname
          , this.user.user_email, this.user.role_id, (this.checked)? "active":"inactive").subscribe(function (res) {
        if (res.is_pass) {
            $this.clearInput();
            setTimeout(function () {
              $this.closeModal();
              $this.getAllUser();
            }, 1500);
        } else {
          console.log(res.message);
        }
      });
    }
  }

  activeChanged(e){
    this.checked = e;
  }

  clearInput(){
    // let form = <HTMLFormElement>document.getElementById("form");
    // form.reset();
    this.user = {};
    this.checked = true;
  }
}
