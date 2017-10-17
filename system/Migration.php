<?php

/**
 * Created by PhpStorm.
 * User: ismailocal
 * Date: 30.09.2017
 * Time: 13:02
 */

use Illuminate\Database\Capsule\Manager as Capsule;
use Phinx\Migration\AbstractMigration;

class Migration extends AbstractMigration {
    /** @var \Illuminate\Database\Capsule\Manager $capsule */
    public $capsule;
    /** @var \Illuminate\Database\Schema\Builder $capsule */
    public $schema;

    public function init()  {

        $settings = require __DIR__ . '/../src/settings.php';

        $this->capsule = new Capsule;
        $this->capsule->addConnection($settings['settings']['db']);

        $this->capsule->bootEloquent();
        $this->capsule->setAsGlobal();
        $this->schema = $this->capsule->schema();
    }
}