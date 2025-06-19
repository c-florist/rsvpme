CREATE TABLE `event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`uuid` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`address` text,
	`date` text,
	`rsvp_deadline` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
