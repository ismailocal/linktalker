<?php

class Pit extends Migration {

    public function up() {

        $this->schema->create('pit', function(Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->integer('top');
            $table->integer('left');
            $table->timestamps();

            $table->index(['top', 'left']);
        });
    }

    public function down() {
        $this->schema->drop('pit');
    }

}
