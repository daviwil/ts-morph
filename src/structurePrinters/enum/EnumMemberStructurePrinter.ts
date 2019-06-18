import { CodeBlockWriter } from "../../codeBlockWriter";
import { EnumMemberStructure, OptionalKind } from "../../structures";
import { NodePrinter } from "../NodePrinter";
import { CommaNewLineSeparatedStructuresPrinter } from "../formatting";
import { WriterFunction } from "../../types";

export class EnumMemberStructurePrinter extends NodePrinter<OptionalKind<EnumMemberStructure> | WriterFunction> {
    private readonly multipleWriter = new CommaNewLineSeparatedStructuresPrinter(this);

    printTexts(writer: CodeBlockWriter, structures: ReadonlyArray<OptionalKind<EnumMemberStructure> | WriterFunction> | undefined) {
        this.multipleWriter.printText(writer, structures);
    }

    protected printTextInternal(writer: CodeBlockWriter, structure: OptionalKind<EnumMemberStructure> | WriterFunction) {
        if (structure instanceof Function) {
            structure(writer);
            return;
        }

        this.factory.forJSDoc().printDocs(writer, structure.docs);
        writer.write(structure.name);
        if (typeof structure.value === "string") {
            const { value } = structure;
            writer.withHangingIndentation(() => writer.write(` = `).quote(value));
        }
        else if (typeof structure.value === "number")
            writer.write(` = ${structure.value}`);
        else
            this.factory.forInitializerExpressionableNode().printText(writer, structure);
    }
}
