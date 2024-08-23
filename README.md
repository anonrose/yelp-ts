# YelpAPI Documentation

This documentation provides an overview of the `YelpAPI` class and its methods, which are used to interact with the Yelp API.

## Table of Contents
- [YelpAPI Documentation](#yelpapi-documentation)
	- [Table of Contents](#table-of-contents)
	- [Introduction](#introduction)
	- [Environment Variables](#environment-variables)
	- [Methods](#methods)
		- [getBusinessDetails](#getbusinessdetails)
		- [getAuthTokenDataFromCallbackCode](#getauthtokendatafromcallbackcode)
		- [newAccessTokenYelpOAuthToken](#newaccesstokenyelpoauthtoken)
		- [getLead](#getlead)
		- [getLeadEvents](#getleadevents)
		- [postYelpLeadEvent](#postyelpleadevent)
		- [gatherDailyYelpReports](#gatherdailyyelpreports)
		- [getYelpReportResult](#getyelpreportresult)
	- [Examples](#examples)
		- [Example 1: Fetching Business Details](#example-1-fetching-business-details)

## Introduction

The `YelpAPI` class provides static methods to interact with various endpoints of the Yelp API. It includes methods for fetching business details, handling OAuth tokens, managing leads, posting lead events, and gathering daily reports.

## Environment Variables

The following environment variables are used by the `YelpAPI` class and should be set in your environment:

- `YELP_AUTH_TOKEN`: The authentication token for accessing Yelp API.
- `YELP_CLIENT_ID`: The client ID for Yelp OAuth.
- `YELP_CLIENT_SECRET`: The client secret for Yelp OAuth.
- `PUBLIC_URL`: The public URL of your application.

## Methods

### getBusinessDetails

Fetches details of a business by its ID or alias.

### getAuthTokenDataFromCallbackCode

Fetches OAuth token data using a callback code.

### newAccessTokenYelpOAuthToken

Fetches a new access token using a refresh token.

### getLead

Fetches details of a lead by its ID.

### getLeadEvents

Fetches events related to a lead by its ID.

### postYelpLeadEvent

Posts a new event for a lead.

### gatherDailyYelpReports

Gathers daily reports for specified business IDs.

### getYelpReportResult

Fetches the result of a previously requested report.

## Examples

### Example 1: Fetching Business Details
