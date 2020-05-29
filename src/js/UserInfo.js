export class UserInfo {
  constructor(pageContent, formInputContent) {
    this.pageContent = pageContent;
    this.formInputContent = formInputContent;
    this.pageName = this.pageContent.userName;
    this.pageJob = this.pageContent.userJob;
    this.inputName = this.formInputContent.userFormNameInput
    this.inputJob = this.formInputContent.userFormJobInput
    // Можно лучше
    // хотя бы переменные эти к пустой строке или null приравняйте
    this.Name;
    this.Job;
  }
  //перенос значений из страницы в поля формы "USER"
  setUserDefault() {
    this.inputName.value = this.pageName.textContent
    this.inputJob.value = this.pageJob.textContent
    //this.inputName.value = "";
    //this.inputJob.value = "";

  }

  //перенос значений и переменных this.Name,this.Job на страницу
  updateUserInfo() {
    this.pageName.textContent = this.Name
    this.pageJob.textContent = this.Job

  }
  //сохранение введенных значений inputName, inputJob в переменные this.Name,this.Job
  setUserInfo() {
    this.Name = this.inputName.value;
    this.Job = this.inputJob.value;

  }


}
