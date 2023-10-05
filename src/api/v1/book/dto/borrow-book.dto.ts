import { CreateBookDto } from "./create-book.dto";
import { PartialType } from "@nestjs/mapped-types";

export class BorrowBookDto extends PartialType(CreateBookDto) {
    borrower_id: string;
    book_id: string;
    returned_at: Date;
}