#include <v/_/0-assert.hpp>
#include <v/_/0-force-inline.hpp>

#pragma push_macro("CMP")
#define CMP VOLTISO_CMP

#pragma push_macro("EQ")
#define EQ VOLTISO_EQ

#pragma push_macro("NE")
#define NE VOLTISO_NE

#pragma push_macro("LT")
#define LT VOLTISO_LT

#pragma push_macro("LE")
#define LE VOLTISO_LE

#pragma push_macro("GT")
#define GT VOLTISO_GT

#pragma push_macro("GE")
#define GE VOLTISO_GE

// !

#pragma push_macro("CHECK")
#define CHECK VOLTISO_CHECK

#pragma push_macro("NOT")
#define NOT VOLTISO_NOT

#pragma push_macro("INLINE")
#define INLINE VOLTISO_FORCE_INLINE

#pragma push_macro("NO_INLINE")
#define NO_INLINE VOLTISO_NO_INLINE

// !

#pragma push_macro("V")
#define V VOLTISO_NAMESPACE

// Windows headers define OPTIONAL as empty macro, conflicts with voltiso naming
#pragma push_macro("OPTIONAL")
#ifdef OPTIONAL
	#undef OPTIONAL
#endif
