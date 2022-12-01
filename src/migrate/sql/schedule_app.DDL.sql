CREATE TABLE IF NOT EXISTS `accesses` (
  `access_id` int NOT NULL AUTO_INCREMENT,
  `access_type` varchar(50) NOT NULL,
  PRIMARY KEY (`access_id`)
);

CREATE TABLE IF NOT EXISTS `batches` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `schedule_year` year NOT NULL,
  `schedule_month` enum(
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ) NOT NULL,
  PRIMARY KEY (`batch_id`)
);

CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `recurrence` enum(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ) DEFAULT NULL,
  PRIMARY KEY (`event_id`)
);

CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile_color` varchar(6) NOT NULL,
  PRIMARY KEY (`member_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50),
  `password` varchar(64),
  `user_email` varchar(50),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `schedules` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `schedule_date` date DEFAULT NULL,
  `event_id` int NOT NULL,
  `batch_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `event_id` (`event_id`),
  KEY `schedules_ibfk_2` (`batch_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_access` (
  `access_id` int NOT NULL,
  `user_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `access_id` (`access_id`),
  CONSTRAINT `user_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_access_ibfk_2` FOREIGN KEY (`access_id`) REFERENCES `accesses` (`access_id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `assignment` (
  `schedule_id` int NOT NULL,
  `member_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `assignment_ibfk_1` (`schedule_id`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`schedule_id`) ON DELETE CASCADE,
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
);