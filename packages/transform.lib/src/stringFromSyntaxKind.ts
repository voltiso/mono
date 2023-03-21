// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SyntaxKind } from 'typescript'

// eslint-disable-next-line etc/no-enum
enum SyntaxKindStr {
	Unknown,
	EndOfFileToken,
	SingleLineCommentTrivia,
	MultiLineCommentTrivia,
	NewLineTrivia,
	WhitespaceTrivia,
	ShebangTrivia,
	ConflictMarkerTrivia,
	NumericLiteral,
	BigIntLiteral,
	StringLiteral,
	JsxText,
	JsxTextAllWhiteSpaces,
	RegularExpressionLiteral,
	NoSubstitutionTemplateLiteral,
	TemplateHead,
	TemplateMiddle,
	TemplateTail,
	OpenBraceToken,
	CloseBraceToken,
	OpenParenToken,
	CloseParenToken,
	OpenBracketToken,
	CloseBracketToken,
	DotToken,
	DotDotDotToken,
	SemicolonToken,
	CommaToken,
	QuestionDotToken,
	LessThanToken,
	LessThanSlashToken,
	GreaterThanToken,
	LessThanEqualsToken,
	GreaterThanEqualsToken,
	EqualsEqualsToken,
	ExclamationEqualsToken,
	EqualsEqualsEqualsToken,
	ExclamationEqualsEqualsToken,
	EqualsGreaterThanToken,
	PlusToken,
	MinusToken,
	AsteriskToken,
	AsteriskAsteriskToken,
	SlashToken,
	PercentToken,
	PlusPlusToken,
	MinusMinusToken,
	LessThanLessThanToken,
	GreaterThanGreaterThanToken,
	GreaterThanGreaterThanGreaterThanToken,
	AmpersandToken,
	BarToken,
	CaretToken,
	ExclamationToken,
	TildeToken,
	AmpersandAmpersandToken,
	BarBarToken,
	QuestionToken,
	ColonToken,
	AtToken,
	QuestionQuestionToken,
	/**
	 * Only the JSDoc scanner produces BacktickToken. The normal scanner produces
	 * NoSubstitutionTemplateLiteral and related kinds.
	 */
	BacktickToken,
	/**
	 * Only the JSDoc scanner produces HashToken. The normal scanner produces
	 * PrivateIdentifier.
	 */
	HashToken,
	EqualsToken,
	PlusEqualsToken,
	MinusEqualsToken,
	AsteriskEqualsToken,
	AsteriskAsteriskEqualsToken,
	SlashEqualsToken,
	PercentEqualsToken,
	LessThanLessThanEqualsToken,
	GreaterThanGreaterThanEqualsToken,
	GreaterThanGreaterThanGreaterThanEqualsToken,
	AmpersandEqualsToken,
	BarEqualsToken,
	BarBarEqualsToken,
	AmpersandAmpersandEqualsToken,
	QuestionQuestionEqualsToken,
	CaretEqualsToken,
	Identifier,
	PrivateIdentifier,
	BreakKeyword,
	CaseKeyword,
	CatchKeyword,
	ClassKeyword,
	ConstKeyword,
	ContinueKeyword,
	DebuggerKeyword,
	DefaultKeyword,
	DeleteKeyword,
	DoKeyword,
	ElseKeyword,
	EnumKeyword,
	ExportKeyword,
	ExtendsKeyword,
	FalseKeyword,
	FinallyKeyword,
	ForKeyword,
	FunctionKeyword,
	IfKeyword,
	ImportKeyword,
	InKeyword,
	InstanceOfKeyword,
	NewKeyword,
	NullKeyword,
	ReturnKeyword,
	SuperKeyword,
	SwitchKeyword,
	ThisKeyword,
	ThrowKeyword,
	TrueKeyword,
	TryKeyword,
	TypeOfKeyword,
	VarKeyword,
	VoidKeyword,
	WhileKeyword,
	WithKeyword,
	ImplementsKeyword,
	InterfaceKeyword,
	LetKeyword,
	PackageKeyword,
	PrivateKeyword,
	ProtectedKeyword,
	PublicKeyword,
	StaticKeyword,
	YieldKeyword,
	AbstractKeyword,
	AsKeyword,
	AssertsKeyword,
	AssertKeyword,
	AnyKeyword,
	AsyncKeyword,
	AwaitKeyword,
	BooleanKeyword,
	ConstructorKeyword,
	DeclareKeyword,
	GetKeyword,
	InferKeyword,
	IntrinsicKeyword,
	IsKeyword,
	KeyOfKeyword,
	ModuleKeyword,
	NamespaceKeyword,
	NeverKeyword,
	OutKeyword,
	ReadonlyKeyword,
	RequireKeyword,
	NumberKeyword,
	ObjectKeyword,
	SetKeyword,
	StringKeyword,
	SymbolKeyword,
	TypeKeyword,
	UndefinedKeyword,
	UniqueKeyword,
	UnknownKeyword,
	FromKeyword,
	GlobalKeyword,
	BigIntKeyword,
	OverrideKeyword,
	OfKeyword,
	QualifiedName,
	ComputedPropertyName,
	TypeParameter,
	Parameter,
	Decorator,
	PropertySignature,
	PropertyDeclaration,
	MethodSignature,
	MethodDeclaration,
	ClassStaticBlockDeclaration,
	Constructor,
	GetAccessor,
	SetAccessor,
	CallSignature,
	ConstructSignature,
	IndexSignature,
	TypePredicate,
	TypeReference,
	FunctionType,
	ConstructorType,
	TypeQuery,
	TypeLiteral,
	ArrayType,
	TupleType,
	OptionalType,
	RestType,
	UnionType,
	IntersectionType,
	ConditionalType,
	InferType,
	ParenthesizedType,
	ThisType,
	TypeOperator,
	IndexedAccessType,
	MappedType,
	LiteralType,
	NamedTupleMember,
	TemplateLiteralType,
	TemplateLiteralTypeSpan,
	ImportType,
	ObjectBindingPattern,
	ArrayBindingPattern,
	BindingElement,
	ArrayLiteralExpression,
	ObjectLiteralExpression,
	PropertyAccessExpression,
	ElementAccessExpression,
	CallExpression,
	NewExpression,
	TaggedTemplateExpression,
	TypeAssertionExpression,
	ParenthesizedExpression,
	FunctionExpression,
	ArrowFunction,
	DeleteExpression,
	TypeOfExpression,
	VoidExpression,
	AwaitExpression,
	PrefixUnaryExpression,
	PostfixUnaryExpression,
	BinaryExpression,
	ConditionalExpression,
	TemplateExpression,
	YieldExpression,
	SpreadElement,
	ClassExpression,
	OmittedExpression,
	ExpressionWithTypeArguments,
	AsExpression,
	NonNullExpression,
	MetaProperty,
	SyntheticExpression,
	TemplateSpan,
	SemicolonClassElement,
	Block,
	EmptyStatement,
	VariableStatement,
	ExpressionStatement,
	IfStatement,
	DoStatement,
	WhileStatement,
	ForStatement,
	ForInStatement,
	ForOfStatement,
	ContinueStatement,
	BreakStatement,
	ReturnStatement,
	WithStatement,
	SwitchStatement,
	LabeledStatement,
	ThrowStatement,
	TryStatement,
	DebuggerStatement,
	VariableDeclaration,
	VariableDeclarationList,
	FunctionDeclaration,
	ClassDeclaration,
	InterfaceDeclaration,
	TypeAliasDeclaration,
	EnumDeclaration,
	ModuleDeclaration,
	ModuleBlock,
	CaseBlock,
	NamespaceExportDeclaration,
	ImportEqualsDeclaration,
	ImportDeclaration,
	ImportClause,
	NamespaceImport,
	NamedImports,
	ImportSpecifier,
	ExportAssignment,
	ExportDeclaration,
	NamedExports,
	NamespaceExport,
	ExportSpecifier,
	MissingDeclaration,
	ExternalModuleReference,
	JsxElement,
	JsxSelfClosingElement,
	JsxOpeningElement,
	JsxClosingElement,
	JsxFragment,
	JsxOpeningFragment,
	JsxClosingFragment,
	JsxAttribute,
	JsxAttributes,
	JsxSpreadAttribute,
	JsxExpression,
	CaseClause,
	DefaultClause,
	HeritageClause,
	CatchClause,
	AssertClause,
	AssertEntry,
	ImportTypeAssertionContainer,
	PropertyAssignment,
	ShorthandPropertyAssignment,
	SpreadAssignment,
	EnumMember,
	UnparsedPrologue,
	UnparsedPrepend,
	UnparsedText,
	UnparsedInternalText,
	UnparsedSyntheticReference,
	SourceFile,
	Bundle,
	UnparsedSource,
	InputFiles,
	JSDocTypeExpression,
	JSDocNameReference,
	JSDocMemberName,
	JSDocAllType,
	JSDocUnknownType,
	JSDocNullableType,
	JSDocNonNullableType,
	JSDocOptionalType,
	JSDocFunctionType,
	JSDocVariadicType,
	JSDocNamepathType,
	/** @deprecated Use SyntaxKind.JSDoc */
	JSDocComment,
	JSDocText,
	JSDocTypeLiteral,
	JSDocSignature,
	JSDocLink,
	JSDocLinkCode,
	JSDocLinkPlain,
	JSDocTag,
	JSDocAugmentsTag,
	JSDocImplementsTag,
	JSDocAuthorTag,
	JSDocDeprecatedTag,
	JSDocClassTag,
	JSDocPublicTag,
	JSDocPrivateTag,
	JSDocProtectedTag,
	JSDocReadonlyTag,
	JSDocOverrideTag,
	JSDocCallbackTag,
	JSDocEnumTag,
	JSDocParameterTag,
	JSDocReturnTag,
	JSDocThisTag,
	JSDocTypeTag,
	JSDocTemplateTag,
	JSDocTypedefTag,
	JSDocSeeTag,
	JSDocPropertyTag,
	SyntaxList,
	NotEmittedStatement,
	PartiallyEmittedExpression,
	CommaListExpression,
	MergeDeclarationMarker,
	EndOfDeclarationMarker,
	SyntheticReferenceExpression,
	Count,
	FirstAssignment,
	LastAssignment,
	FirstCompoundAssignment,
	LastCompoundAssignment,
	FirstReservedWord,
	LastReservedWord,
	FirstKeyword,
	LastKeyword,
	FirstFutureReservedWord,
	LastFutureReservedWord,
	FirstTypeNode,
	LastTypeNode,
	FirstPunctuation,
	LastPunctuation,
	FirstToken,
	LastToken,
	FirstTriviaToken,
	LastTriviaToken,
	FirstLiteralToken,
	LastLiteralToken,
	FirstTemplateToken,
	LastTemplateToken,
	FirstBinaryOperator,
	LastBinaryOperator,
	FirstStatement,
	LastStatement,
	FirstNode,
	FirstJSDocNode,
	LastJSDocNode,
	FirstJSDocTagNode,
	LastJSDocTagNode,
	JSDoc,
}

export function stringFromSyntaxKind(syntaxKind: SyntaxKind): string {
	return SyntaxKindStr[syntaxKind]
}
