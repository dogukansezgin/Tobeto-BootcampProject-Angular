import { Pipe, PipeTransform } from "@angular/core";
import { GetBootcampResponse } from "../../features/models/responses/bootcamps/get-bootcamp-response";

@Pipe({
    name:'filterBootcampText'
})
export class FilterBootcampPipe implements PipeTransform{

    transform(value: GetBootcampResponse[], filterText: string): GetBootcampResponse[] {
        filterText = filterText ? filterText.toLocaleLowerCase() : "";
        return filterText ? value.filter((bootcamp: GetBootcampResponse)=> bootcamp.instructorFirstName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
    }
}
