import { Status } from './status';

export class SuccessResponse<DataType> {
  private message: string = '';
  private data: DataType;
  private status: Status = Status.SUCCESS;

  constructor(message: string, data: DataType, status?: Status) {
    this.message = message;
    this.data = data;
    this.status = status ?? this.status;
  }
}
