type YelpLocation = {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets: string;
};

type OpenHour = {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
};

type Hours = {
  open: OpenHour[];
  hours_type: string;
  is_open_now: boolean;
};

type Messaging = {
  url: string;
  use_case_text: string;
};

export type YelpBusiness = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  rating: number;
  location: YelpLocation;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  categories: Array<{
    alias: string;
    title: string;
  }>;
  photos: string[];
  hours: Hours[];
  transactions: string[];
  messaging: Messaging;
};

export type YelpAccessToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
  expires_on: string;
};

export type YelpAuthToken = {
  access_token: string;
  expires_in: number;
  expires_on: string;
  token_type: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  refresh_token_expires_on: string;
  scope: string;
};

export type YelpWebhookEvent = {
  time: string;
  object: "business";
  data: {
    id: string;
    updates: Array<{
      event_type: "NEW_EVENT";
      event_id: string;
      lead_id: string;
      interaction_time: string;
    }>;
  };
};

type YelpEventContent = {
  fallback_text: string;
  text: string;
};

type YelpEvent = {
  id: string;
  cursor: string;
  time_created: string;
  event_type: string;
  user_type: "BIZ" | "CONSUMER";
  event_content: YelpEventContent;
  user_id: string;
  user_display_name: string;
};

export type YelpEventsWrapper = {
  events: YelpEvent[];
  error?: {
    code: string;
    description: string;
  };
};

export type YelpLead = {
  business_id: string;
  id: string;
  conversation_id: string;
  temporary_email_address: string;
  temporary_email_address_expiry: string;
  temporary_phone_number: string;
  temporary_phone_number_expiry: string;
  time_created: string;
  last_event_time: string;
};

export type YelpAdCost = {
  cost: number;
  currency: string;
};

export type YelpProgram = {
  program_id: string;
  program_type: string;
  billable_ad_impressions: number;
  ad_driven_online_reservations: number;
  ad_driven_cta_clicks: number;
  billed_clicks: number;
  ad_cost: YelpAdCost;
  ad_driven_user_photos: number;
  ad_driven_waitlist_visit_created: number;
  ad_driven_url_clicks: number;
  billable_ad_clicks: number;
  ad_driven_deals_sold: number;
  ad_driven_biz_page_views_percentage: number;
  ad_click_through_rate: number;
  ad_driven_rapc_initiated: number;
  ad_driven_bookmarks: number;
  ad_driven_total_leads: number;
  ad_driven_messages_to_business: number;
  ad_driven_biz_page_views: number;
  average_cost_per_click: number;
  ad_driven_directions_and_map_views: number;
  ad_driven_platform_purchase_made: number;
  ad_driven_calls_tracked: number;
  ad_driven_calls: number;
  ad_driven_check_ins: number;
  billed_impressions: number;
};

export type YelpMetric = {
  date: string;
  programs: YelpProgram[];
  num_desktop_page_views: number;
  num_calls: number;
  num_user_photos: number;
  check_in_offer_redemptions: number;
  reply_rate: number;
  rapc_initiated: number;
  organic_biz_page_views_percentage: number;
  collection_item_added: number;
  reviews: number;
  total_leads: number;
  deals_sold: number;
  online_orders: number;
  url_clicks: number;
  num_total_page_views: number;
  num_messages_to_business: number;
  num_directions_and_map_views: number;
  tracking_calls: number;
  waitlist_visit_created: number;
  num_check_ins: number;
  num_desktop_cta_clicks: number;
  num_mobile_search_appearances: number;
  num_mobile_cta_clicks: number;
  organic_biz_page_views: number;
  num_desktop_search_appearances: number;
  num_bookmarks: number;
  online_bookings: number;
  median_response_time_in_sec: number;
  rating: number;
  num_mobile_page_views: number;
};

export type YelpBusinessMetrics = {
  business_id: string;
  metrics: YelpMetric[];
};

export type YelpMetricsReport = {
  data: YelpBusinessMetrics[];
  report_id: string;
  errors: {
    inactive_ids: string[];
    invalid_ids: string[];
    unauthorized_ids: string[];
  };
};

export type YelpMetricsReportResponse =
  | YelpMetricsReport
  | {
      error: {
        code: "VALIDATION_ERROR" | "JOB_NOT_COMPLETE";
        description: string;
      };
    };

interface ProgramMetrics {
  budget: number;
  currency: string;
  is_autobid: boolean;
  max_bid: number | null;
  billed_impressions: number;
  billed_clicks: number;
  ad_cost: number;
  fee_period: string;
}

interface Business {
  yelp_business_id: string;
  partner_business_id: string | null;
}

interface PaymentProgram {
  active_features: string[];
  available_features: string[];
  end_date: string;
  program_id: string;
  program_pause_status: string;
  program_status: string;
  program_type: string;
  start_date: string;
  businesses: Business[];
  program_metrics?: ProgramMetrics;
}

export interface YelpApiResponse {
  payment_programs: PaymentProgram[];
  offset: number;
  limit: number;
  program_status: string;
  total: number;
}
