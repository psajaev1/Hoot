CREATE TABLE `project`.`Users` (
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `interest1` VARCHAR(45) NOT NULL,
  `interest2` VARCHAR(45) NULL,
  `interest3` VARCHAR(45) NULL,
  `grad_year` INT NULL,
  `occupation` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`)
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE);

CREATE TABLE `project`.`Mentors` (
  `mentor_id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `interest1` VARCHAR(45) NOT NULL,
  `interest2` VARCHAR(45) NULL,
  `interest3` VARCHAR(45) NULL,
  `grad_year` INT NOT NULL,
  `occupation` VARCHAR(45) NOT NULL,
  `major` VARCHAR(45) NULL,
  PRIMARY KEY (`mentor_id`),
  UNIQUE INDEX `mentor_id_UNIQUE` (`mentor_id` ASC) VISIBLE);

CREATE TABLE `project`.`Pairing` (
  `user_id` INT NOT NULL,
  `mentor_id` INT NOT NULL,
  `focus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`, `mentor_id`, `focus`));

ALTER TABLE `project`.`Pairing` 
ADD INDEX `mentor_idx` (`mentor_id` ASC) VISIBLE;
;

ALTER TABLE `project`.`Pairing` 
ADD CONSTRAINT `user`
  FOREIGN KEY (`user_id`)
  REFERENCES `project`.`Users` (`user_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `mentor`
  FOREIGN KEY (`mentor_id`)
  REFERENCES `project`.`Mentors` (`mentor_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
