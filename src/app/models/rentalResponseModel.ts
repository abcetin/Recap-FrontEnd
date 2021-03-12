import { Rental } from "./rental";
import { ResponseModel } from "./responseModel";

export interface RentalResponseModule extends ResponseModel{
    data : Rental[];
}