<?php

class Post extends Migration {

    public function up() {
        $this->schema->create('post', function(Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->integer('pit_id');
            $table->integer('user_id');
            $table->text('content');
            $table->timestamps();

            $table->index('pit_id');
            $table->index('user_id');
        });
    }

    public function down() {
        $this->schema->drop('post');
    }

}
