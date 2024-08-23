import { env } from "./env";
import fetch, { Response } from "node-fetch";
import {
  YelpBusiness,
  YelpAuthToken,
  YelpAccessToken,
  YelpEventsWrapper,
  YelpLead,
  YelpMetricsReportResponse,
} from "./index.types";

const { YELP_AUTH_TOKEN } = env;

export default class YelpAPI {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  private static async handlePostResponse<T>(
    response: Response
  ): Promise<{ success: true } | { success: false; reason: string }> {
    if (!response.ok) {
      return {
        success: false,
        reason: `Error posting lead event: ${response.statusText}`,
      };
    }
    return { success: true };
  }

  private static getHeaders(
    authToken: string,
    contentType: string = "application/json"
  ) {
    return {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": contentType,
      Accept: "application/json",
    };
  }

  public static async getBusinessDetails(
    businessIdOrAlias: string
  ): Promise<YelpBusiness> {
    const url = new URL(
      `https://api.yelp.com/v3/businesses/${businessIdOrAlias}`
    );
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.getHeaders(YELP_AUTH_TOKEN),
    });
    return this.handleResponse<YelpBusiness>(response);
  }

  public static async getAuthTokenDataFromCallbackCode(
    code: string
  ): Promise<YelpAuthToken> {
    const response = await fetch("https://api.yelp.com/oauth2/token", {
      method: "POST",
      headers: this.getHeaders("", "application/x-www-form-urlencoded"),
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.YELP_CLIENT_ID,
        code,
        redirect_uri: `${env.PUBLIC_URL}/api/callback/yelp`,
        client_secret: env.YELP_CLIENT_SECRET,
      }),
    });
    return this.handleResponse<YelpAuthToken>(response);
  }

  public static async newAccessTokenYelpOAuthToken(
    refreshToken: string
  ): Promise<YelpAccessToken> {
    const response = await fetch("https://api.yelp.com/oauth2/token", {
      method: "POST",
      headers: this.getHeaders("", "application/x-www-form-urlencoded"),
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: env.YELP_CLIENT_ID,
        client_secret: env.YELP_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
    });
    return this.handleResponse<YelpAccessToken>(response);
  }

  public static async getLead(
    leadId: string,
    accessToken: string
  ): Promise<YelpLead> {
    const response = await fetch(`https://api.yelp.com/v3/leads/${leadId}`, {
      headers: this.getHeaders(accessToken),
    });
    return this.handleResponse<YelpLead>(response);
  }

  public static async getLeadEvents(
    leadId: string,
    accessToken: string,
    limit: number
  ): Promise<YelpEventsWrapper> {
    const response = await fetch(
      `https://api.yelp.com/v3/leads/${leadId}/events?limit=${limit}`,
      {
        headers: this.getHeaders(accessToken),
      }
    );
    return this.handleResponse<YelpEventsWrapper>(response);
  }

  public static async postYelpLeadEvent(
    leadId: string,
    requestContent: string,
    authToken: string
  ): Promise<{ success: true } | { success: false; reason: string }> {
    const response = await fetch(
      `https://api.yelp.com/v3/leads/${leadId}/events`,
      {
        method: "POST",
        headers: this.getHeaders(authToken),
        body: JSON.stringify({
          request_type: "TEXT",
          request_content: requestContent,
        }),
      }
    );

    return this.handlePostResponse(response);
  }

  public static async gatherDailyYelpReports(
    businessIds: string[],
    { start, end }: { start: string; end: string },
    metrics: string[] = [
      "num_total_page_views",
      "num_calls",
      "num_directions_and_map_views",
      "url_clicks",
      "num_check_ins",
      "num_user_photos",
      "num_bookmarks",
      "num_desktop_cta_clicks",
      "num_mobile_cta_clicks",
      "num_messages_to_business",
      "num_mobile_page_views",
      "num_desktop_search_appearances",
      "num_mobile_search_appearances",
      "num_desktop_page_views",
      "tracking_calls",
      "deals_sold",
      "online_orders",
      "online_bookings",
      "check_in_offer_redemptions",
      "collection_item_added",
      "rapc_initiated",
      "waitlist_visit_created",
      "median_response_time_in_sec",
      "reply_rate",
      "organic_biz_page_views",
      "organic_biz_page_views_percentage",
      "rating",
      "reviews",
      "total_leads",
      "billed_impressions",
      "billed_clicks",
      "ad_cost",
      "ad_driven_bookmarks",
      "ad_driven_calls",
      "ad_driven_cta_clicks",
      "ad_driven_check_ins",
      "ad_driven_deals_sold",
      "ad_driven_directions_and_map_views",
      "ad_driven_messages_to_business",
      "ad_driven_user_photos",
      "ad_driven_online_reservations",
      "ad_driven_url_clicks",
      "ad_click_through_rate",
      "average_cost_per_click",
      "billable_ad_clicks",
      "billable_ad_impressions",
      "ad_driven_biz_page_views",
      "ad_driven_calls_tracked",
      "ad_driven_rapc_initiated",
      "ad_driven_waitlist_visit_created",
      "ad_driven_total_leads",
      "ad_driven_platform_purchase_made",
      "ad_driven_biz_page_views_percentage",
    ]
  ): Promise<{ id: string }> {
    const response = await fetch(
      "https://api.yelp.com/v3/reporting/businesses/daily",
      {
        method: "POST",
        headers: this.getHeaders(YELP_AUTH_TOKEN),
        body: JSON.stringify({
          start,
          end,
          ids: businessIds,
          metrics,
        }),
      }
    );

    return this.handleResponse<{ id: string }>(response);
  }

  public static async getYelpReportResult(
    reportId: string
  ): Promise<YelpMetricsReportResponse> {
    const url = new URL(
      `https://api.yelp.com/v3/reporting/businesses/daily/${reportId}`
    );
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.getHeaders(YELP_AUTH_TOKEN),
    });

    return this.handleResponse<YelpMetricsReportResponse>(response);
  }
}
