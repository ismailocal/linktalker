var io = function () {

    this.instance = function () {

        var assets = {};

        this.inject = function (args) {
            args.map(function (inject) {
                assets[this.key].injects.push(inject);
            }.bind(this));
        };

        this.extend = function (args) {
            args.map(function (extend) {
                assets[this.key].extends.push(extend);
            }.bind(this));
        };

        this.define = function (key, value, main) {
            if (typeof key === 'string') {
                if (!assets[key]) {

                    var _key = key.split(':');

                    if (assets[_key[0]]) {
                        assets[key] = $.extend(true, assets[_key[0]].prototype, assets[_key[0]]);
                    } else {

                        if (main) {
                            this.key = key;
                        }

                        assets[key] = {
                            value: value,
                            object: null,
                            extends: [],
                            injects: []
                        };
                    }
                }
            } else {
                assets[this.key].value = key;
            }
        };

        this.create = function (key, value) {

            this.define(key, value, true);

            if (assets[this.key].object) {
                return assets[this.key].object;
            } else if (assets[this.key].value) {
                return this.new(this.key);
            } else {
                return null;
            }

        };

        this.new = function (key) {

            assets[key].extends.map(function (extend) {

                this.define(extend);

                if (!assets[extend].object) {
                    this.new(extend);
                }

                if (assets[key].value instanceof Function) {
                    assets[key].value.prototype = $.extend(true, assets[key].value.prototype, assets[extend].object);
                } else if (assets[key].value instanceof Array) {
                    assets[key].value = assets[key].value.concat(assets[extend].value);
                } else if (assets[key].value instanceof Object) {
                    assets[key].value = $.extend(true, assets[key].value, assets[extend].value);
                }

            }.bind(this));

            if (typeof assets[key].value === 'function') {

                var injects = [];

                assets[key].injects.map(function (inject) {

                    this.define(inject);
                    if (!assets[inject].object) {
                        this.new(inject);
                    }

                    injects.push(assets[inject].object);
                }.bind(this));
                return assets[key].object = new (Function.prototype.bind.apply(assets[key].value, [null].concat(injects)));
            } else {
                return assets[key].object = assets[key].value;
            }
        };
    };

    this.modules = {};

    this.module = function (name) {

        if (this.modules[name]) {
            return this.modules[name];
        }

        var instance = new this.instance();

        var self = {};

        self.extend = function () {
            instance.extend([].slice.call(arguments));
            return self;
        };

        self.inject = function () {
            instance.inject([].slice.call(arguments));
            return self;
        };

        self.get = function (key, value) {
            return self.create(key, value);
        };

        self.new = function (key) {
            return self.create(key);
        };

        self.create = function (key, value) {
            if (instance.create(key, value)) {
                return self[instance.key] = instance.create(key, value);
            } else {
                return this;
            }
        };

        self.define = function (key, value) {
            instance.define(key, value);
            return this;
        };

        self.controller = function (key, value) {
            return self.create(key, value);
        };

        self.service = function (key, value) {
            return self.create(key, value);
        };

        self.value = function (key, value) {
            return self.create(key, value);
        };

        self.config = function (value) {
            return self.create('config', value);
        };

        this.modules[name] = self;

        return this.modules[name];
    };
};