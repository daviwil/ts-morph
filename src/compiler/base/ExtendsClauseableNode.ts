﻿import * as ts from "typescript";
import {Node} from "./../common";
import {HeritageClauseableNode} from "./HeritageClauseableNode";
import {ExpressionWithTypeArguments} from "./../type/ExpressionWithTypeArguments";

export type ExtendsClauseableNodeExtensionType = Node & HeritageClauseableNode;

export interface ExtendsClauseableNode {
    getExtends(): ExpressionWithTypeArguments[];
}

export function ExtendsClauseableNode<T extends Constructor<ExtendsClauseableNodeExtensionType>>(Base: T): Constructor<ExtendsClauseableNode> & T {
    return class extends Base implements ExtendsClauseableNode {
        /**
         * Gets the extends clauses
         */
        getExtends(): ExpressionWithTypeArguments[] {
            const heritageClauses = this.getHeritageClauses();
            const extendsClause = heritageClauses.find(c => c.node.token === ts.SyntaxKind.ExtendsKeyword);
            if (extendsClause == null)
                return [];

            return extendsClause.getTypes();
        }
    };
}