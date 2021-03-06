describe('Switcher View', function() {
  var switcherView;
  var taskModel;

  beforeEach(function() {
    taskModel = new app.model.Task({
      total: 3600,
      order: 2
    });
    switcherView = new app.view.Switcher({
      model: taskModel
    });
  });

  it('should render task order class name', function() {
    expect(switcherView.$el).toHaveClass('task-order-2');
  });

  it('should automatically activate if first task', function() {
    taskModel = new app.model.Task({
      order: 1
    });
    switcherView = new app.view.Switcher({
      model: taskModel
    });

    expect(switcherView.$el).toHaveClass('active');
  });

  it('should remove class active when switch to other task', function() {
    switcherView.$el.addClass('active');
    app.Event.trigger(app.Event.Switch, new app.model.Task({
      order: 3
    }));

    expect(switcherView.$el).not.toHaveClass('active');
  });

  it('should not remove class active when switch to other task', function() {
    switcherView.$el.addClass('active');
    app.Event.trigger(app.Event.Switch, new app.model.Task({
      order: 2
    }));

    expect(switcherView.$el).toHaveClass('active');
  });

  it('should active and trigger switch when click switcher', function() {
    expect(switcherView.$el).not.toHaveClass('active');

    spyOn(app.Event, 'trigger');
    switcherView.$el.find('.activate').click();

    expect(switcherView.$el).toHaveClass('active');
    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.Switch, taskModel);
  });

  it('should not trigger switch when already activated', function() {
    switcherView.$el.addClass('active');

    spyOn(app.Event, 'trigger');
    switcherView.$el.find('.activate').click();

    expect(app.Event.trigger).not.toHaveBeenCalled();
  });
});