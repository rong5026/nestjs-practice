import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} ins't in the status`);
        }
        //console.log('value', value);
        //console.log('metadata', metadata);
        // value 1PRIVATE132323232
        // metadata { metatype: [Function: String], type: 'body', data: 'status' }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        console.log(index);
        // Status에 없는 값이면 -1 리턴
        return index !== -1;
    }
}