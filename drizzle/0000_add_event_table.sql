CREATE TABLE `event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`password` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`address` text,
	`date` text,
	`rsvp_by_date` text,
	`invitees` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
