-- schedule_app.batches definition

CREATE TABLE `batches` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `schedule_year` year NOT NULL,
  `schedule_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') NOT NULL,
  PRIMARY KEY (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- schedule_app.events definition

CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `recurrence` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- schedule_app.members definition

CREATE TABLE `members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile_color` varchar(6) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- schedule_app.schedules definition

CREATE TABLE `schedules` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `schedule_date` date DEFAULT NULL,
  `event_id` int NOT NULL,
  `batch_id` int NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `event_id` (`event_id`),
  KEY `schedules_ibfk_2` (`batch_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- schedule_app.`assignment` definition

CREATE TABLE `assignment` (
  `schedule_id` int NOT NULL,
  `member_id` int NOT NULL,
  KEY `member_id` (`member_id`),
  KEY `assignment_ibfk_1` (`schedule_id`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`schedule_id`) ON DELETE CASCADE,
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;