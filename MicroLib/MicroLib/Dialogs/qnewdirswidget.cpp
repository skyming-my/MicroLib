#include "qnewdirswidget.h"

QNewDirsWidget::QNewDirsWidget(QWidget *parent)
	: QBaseWidget(parent)
{
	ui.setupUi(this);
	setFixedSize(420, 260);
	connect(ui.btnClose, &QToolButton::clicked, [=](){
		emit sigCloseClicked();
	});
}

QNewDirsWidget::~QNewDirsWidget()
{

}