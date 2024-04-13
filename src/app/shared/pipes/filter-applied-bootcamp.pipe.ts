import { Pipe, PipeTransform } from "@angular/core";
import { AppliedBootcampResponse } from "../../features/models/responses/applications/applied-bootcamp-response";

@Pipe({
    name:'filterAppliedBootcampText'
})
export class FilterAppliedBootcampPipe implements PipeTransform{

    transform(value: AppliedBootcampResponse[], filterText: string): AppliedBootcampResponse[] {
        filterText = filterText ? filterText.toLocaleLowerCase() : "";
        return filterText ? value.filter((appliedBootcamp: AppliedBootcampResponse)=> appliedBootcamp.bootcampInstructorFirstName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
    }
}
