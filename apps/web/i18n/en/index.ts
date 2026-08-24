import { common } from "./common"
import { system } from "./system"
import { navigation } from "./navigation"
import { dashboard } from "./routes/dashboard"

export const en = {
    common,
    system,
    dashboard,
    navigation,
}

export type TranslationDictionary = typeof en
