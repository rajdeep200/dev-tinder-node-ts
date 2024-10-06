export class ResponseBody {
  private success: boolean;
  private message?: string;
  private data?: any;
  constructor(success: boolean, message?: string, data?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
