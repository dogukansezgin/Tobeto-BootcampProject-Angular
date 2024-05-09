import { Pipe, PipeTransform } from "@angular/core";
import { BootcampSearchItemResponse } from "../../features/models/responses/bootcamps/bootcamp-search-item-response";

@Pipe({
    name: 'filterBootcampText'
})
export class FilterBootcampPipe implements PipeTransform {

    transform(value: BootcampSearchItemResponse[], filterText: string): BootcampSearchItemResponse[] {
        filterText = filterText ? filterText.toLocaleLowerCase() : "";
        return filterText ? value.filter((bootcamp: BootcampSearchItemResponse) => bootcamp.name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
    }
    
}
