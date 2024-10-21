const SYSTEM_NAME = "v3-admin-vite"

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`

  static readonly USER_TYPE = `${SYSTEM_NAME}-user-type`
  static readonly USER_STATUS = `${SYSTEM_NAME}-user-status`
  static readonly EVENT_TYPE = `${SYSTEM_NAME}-event-type`
  static readonly EVENT_STATUS = `${SYSTEM_NAME}-event-status`
  static readonly EVENT_TARGET_GROUP_TYPE = `${SYSTEM_NAME}-event-target-group-type`
}

export default CacheKey
