import { Pipe, PipeTransform } from "@angular/core";
import { GetBootcampListResponse } from "../../features/models/responses/bootcamps/get-bootcamp-list-response";

@Pipe({
    name:'filterBootcampText'
})
export class FilterBootcampPipe implements PipeTransform{

    transform(value: GetBootcampListResponse[], filterText: string): GetBootcampListResponse[] {
        filterText = filterText ? filterText.toLocaleLowerCase() : "";
        return filterText ? value.filter((bootcamp: GetBootcampListResponse)=> bootcamp.instructorFirstName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
    }
}
