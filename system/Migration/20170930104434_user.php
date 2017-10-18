<?php

class User extends Migration {

    public function up() {
        $this->schema->create('user', function(Illuminate\Database\Schema\Blueprint $table) {
            // Auto-increment id
            $table->increments('id');
            $table->string('username');
            $table->string('mail');
            $table->string('password');
            $table->string('token')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        $this->schema->drop('user');
    }

}
