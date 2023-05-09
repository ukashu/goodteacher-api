-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('STUDENT', 'TEACHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "accountType" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_classes" (
    "user_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "joined" BOOLEAN NOT NULL DEFAULT false,
    "user_alias" VARCHAR(25) NOT NULL,

    CONSTRAINT "users_classes_pkey" PRIMARY KEY ("user_id","class_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_classes_user_id_class_id_key" ON "users_classes"("user_id", "class_id");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
